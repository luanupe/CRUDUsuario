variable "app_name" { type = string }
variable "app_env" { type = string }
variable "app_region" { type = string }

# Database
variable "database_cluster" { type = string }
variable "database_engine" { type = string }
variable "database_host" { type = string }
variable "database_port" { type = number }
variable "database_username" { type = string }
variable "database_password" { type = string }
variable "database_schema" { type = string }
variable "database_production" { type = bool }

# Redis
variable "redis_cluster" { type = string }
variable "redis_host" { type = string }
variable "redis_port" { type = number }
variable "redis_username" { type = string }
variable "redis_password" { type = string }
variable "redis_schema" { type = string }
variable "redis_production" { type = bool }

# Spaces Bucket
variable "bucket_name" { type = string }
variable "secrets_s3_id" { type = string }
variable "secrets_s3_key" { type = string }

# Settings
variable "server_type" { type = string }
variable "server_size" { type = string }
variable "server_instances" { type = string }

# HTTP
variable "http_port" { type = number }
variable "http_route" { type = string }
variable "http_domain" { type = string }
variable "http_subdomain" { type = string }

# Git
variable "git_repository" { type = string }
variable "git_branch" { type = string }
variable "git_auto_deploy" { type = bool }

# Code
variable "code_source" { type = string }
variable "code_build" { type = string }
variable "code_run" { type = string }

# Environment
variable "env_database_poll_size" { type = string }
variable "env_database_schema_drop" { type = string }
variable "env_database_schema_sync" { type = string }
variable "env_jwt_private" { type = string }
variable "env_jwt_public" { type = string }
variable "env_jwt_expiration" { type = string }
variable "env_jwt_algorithm" { type = string }

# Healthcheck
variable "healthcheck_path" { type = string }
variable "healthcheck_wait" { type = number }
variable "healthcheck_frequency" { type = number }
variable "healthcheck_timeout" { type = number }
variable "healthcheck_failures" { type = number }
variable "healthcheck_successes" { type = number }

# App Alert
variable "app_alert" { type = string }

# CPU Alert
variable "alert_cpu_rule" { type = string }
variable "alert_cpu_operator" { type = string }
variable "alert_cpu_window" { type = string }
variable "alert_cpu_value" { type = number }
variable "alert_cpu_disabled" { type = bool }

# RAM Alert
variable "alert_ram_rule" {type = string }
variable "alert_ram_operator" { type = string }
variable "alert_ram_window" { type = string }
variable "alert_ram_value" { type = number }
variable "alert_ram_disabled" { type = bool }
