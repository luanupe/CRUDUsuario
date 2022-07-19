terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }

  backend "s3" {
    region = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check = true
  }
}

provider digitalocean {
  token = var.token
  spaces_access_id  = var.spaces_id
  spaces_secret_key = var.spaces_key
}

resource "random_uuid" "uuid" {
}

module "storage" {
  source            = "./storage"
  app_name          = var.application_name
  app_env           = var.project_environment
  app_region        = var.application_region
  bucket_uuid       = random_uuid.uuid.result
  bucket_visibility = var.storage_visibility
  bucket_destroy    = var.storage_destroy
}

module "database" {
  source                = "./database"
  app_name              = var.application_name
  app_env               = var.project_environment
  app_region            = var.application_region
  database_engine       = var.database_engine
  database_version      = var.database_version
  database_nodes        = var.database_nodes
  database_size         = var.database_size
}

module "redis" {
  source                = "./database"
  app_name              = var.application_name
  app_env               = var.project_environment
  app_region            = var.application_region
  database_engine       = "redis"
  database_version      = var.redis_version
  database_nodes        = var.redis_nodes
  database_size         = var.redis_size
}

module "application" {
  source                    = "./application"

  # Environment
  env_database_poll_size    = var.web_environment_database_poll_size
  env_database_schema_drop  = var.web_environment_database_schema_drop
  env_database_schema_sync  = var.web_environment_database_schema_sync
  env_jwt_private           = var.web_environment_jwt_private
  env_jwt_public            = var.web_environment_jwt_public
  env_jwt_expiration        = var.web_environment_jwt_expiration
  env_jwt_algorithm         = var.web_environment_jwt_algorithm

  # Application
  app_name                  = var.application_name
  app_env                   = var.project_environment
  app_region                = var.application_region

  # Server
  server_type               = var.web_server_type
  server_size               = var.web_server_size
  server_instances          = var.web_server_replicas

  # HTTP
  http_port                 = var.web_server_port
  http_route                = var.web_server_route
  http_domain               = var.application_domain
  http_subdomain            = var.application_subdomain

  # Repository
  git_repository            = var.web_git_repository
  git_branch                = var.web_git_branch
  git_auto_deploy           = var.web_git_auto_deploy

  # Code
  code_source               = var.web_code_source
  code_build                = var.web_code_build
  code_run                  = var.web_code_run

  # Custom Database
  database_production       = var.database_production
  database_cluster          = module.database.cluster
  database_engine           = module.database.engine
  database_host             = module.database.host
  database_port             = module.database.port
  database_username         = module.database.username
  database_password         = module.database.password
  database_schema           = module.database.schema

  # Redis Database
  redis_production          = var.redis_production
  redis_cluster             = module.redis.cluster
  redis_host                = module.redis.host
  redis_port                = module.redis.port
  redis_username            = module.redis.username
  redis_password            = module.redis.password
  redis_schema              = module.redis.schema

  # Spaces Bucket
  secrets_s3_id             = var.spaces_id
  secrets_s3_key            = var.spaces_key
  bucket_name               = module.storage.name

  # Health Check
  healthcheck_path          = var.web_healthcheck_path
  healthcheck_wait          = var.web_healthcheck_wait
  healthcheck_frequency     = var.web_healthcheck_frequency
  healthcheck_timeout       = var.web_healthcheck_timeout
  healthcheck_failures      = var.web_healthcheck_failures
  healthcheck_successes     = var.web_healthcheck_successes

  # Alerts
  app_alert                 = var.application_alert
  alert_cpu_rule            = var.alert_cpu_rule
  alert_cpu_operator        = var.alert_cpu_operator
  alert_cpu_window          = var.alert_cpu_window
  alert_cpu_value           = var.alert_cpu_value
  alert_cpu_disabled        = var.alert_cpu_disabled
  alert_ram_rule            = var.alert_ram_rule
  alert_ram_operator        = var.alert_ram_operator
  alert_ram_window          = var.alert_ram_window
  alert_ram_value           = var.alert_ram_value
  alert_ram_disabled        = var.alert_ram_disabled
}

module "domain" {
  source            = "./domain"
  http_domain       = var.application_domain
}

module "project" {
  source              = "./project"
  project_name        = var.project_name
  project_env         = var.project_environment
  project_description = var.project_description
  project_purpose     = var.project_purpose
  project_resources   = [
    module.database.urn,
    module.redis.urn,
    module.storage.urn,
    module.application.urn,
    module.domain.urn,
  ]
}
