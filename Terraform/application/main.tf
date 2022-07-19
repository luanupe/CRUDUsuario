terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_app" "application" {
  spec {
    name    = lower("app-${var.app_name}-${var.app_env}")
    region  = var.app_region

    alert {
      rule = var.app_alert
    }

    domain {
      name = "${var.http_subdomain}.${var.http_domain}"
      zone = var.http_domain
    }

    database {
      name          = lower("db-${var.database_engine}-${var.app_name}")
      cluster_name  = var.database_cluster
      engine        = upper(var.database_engine)
      db_user       = var.database_username
      db_name       = var.database_schema
      production    = var.database_production
    }

    database {
      name          = lower("db-redis-${var.app_name}")
      cluster_name  = var.redis_cluster
      engine        = "REDIS"
      db_name       = var.redis_schema
      production    = var.redis_production
    }

    service {
      name                = lower("web-${var.app_name}-${var.app_env}")
      environment_slug    = var.server_type
      instance_size_slug  = var.server_size
      instance_count      = var.server_instances
      source_dir          = var.code_source
      build_command       = var.code_build
      run_command         = var.code_run
      http_port           = var.http_port

      github {
        repo           = var.git_repository
        branch         = var.git_branch
        deploy_on_push = var.git_auto_deploy
      }

      routes {
        path = var.http_route
      }

      health_check {
        http_path             = var.healthcheck_path
        initial_delay_seconds = var.healthcheck_wait
        period_seconds        = var.healthcheck_frequency
        timeout_seconds       = var.healthcheck_timeout
        failure_threshold     = var.healthcheck_failures
        success_threshold     = var.healthcheck_successes
      }

      alert {
        rule     = var.alert_cpu_rule
        operator = var.alert_cpu_operator
        value    = var.alert_cpu_value
        window   = var.alert_cpu_window
        disabled = var.alert_cpu_disabled
      }

      alert {
        rule     = var.alert_ram_rule
        operator = var.alert_ram_operator
        value    = var.alert_ram_value
        window   = var.alert_ram_window
        disabled = var.alert_ram_disabled
      }

      env {
        key   = "APP_NAME"
        value = var.app_name
      }
      env {
        key   = "SERVER_HOST"
        value = "https://${var.http_subdomain}.${var.http_domain}"
      }
      env {
        key   = "SERVER_PORT"
        value = tostring(var.http_port)
      }
      env {
        key   = "S3_ACCESS_ID"
        value = var.secrets_s3_id
      }
      env {
        key   = "S3_ACCESS_KEY"
        value = var.secrets_s3_key
      }
      env {
        key   = "S3_REGION"
        value = var.app_region
      }
      env {
        key   = "S3_BUCKET"
        value = var.bucket_name
      }
      env {
        key   = "S3_URL"
        value = "${var.app_region}.digitaloceanspaces.com"
      }
      env {
        key   = "DB_TYPE"
        value = lower(var.database_engine)
      }
      env {
        key   = "DB_HOST"
        value = var.database_host
      }
      env {
        key   = "DB_PORT"
        value = tostring(var.database_port)
      }
      env {
        key   = "DB_USER"
        value = var.database_username
      }
      env {
        key   = "DB_PASSWORD"
        value = var.database_password
      }
      env {
        key   = "DB_NAME"
        value = var.database_schema
      }
      env {
        key   = "DB_CONN_POOL"
        value = tostring(var.env_database_poll_size)
      }
      env {
        key   = "DB_SCHEMA_DROP"
        value = tostring(var.env_database_schema_drop)
      }
      env {
        key   = "DB_SCHEMA_SYNC"
        value = tostring(var.env_database_schema_sync)
      }
      env {
        key   = "REDIS_HOST"
        value = var.redis_host
      }
      env {
        key   = "REDIS_PORT"
        value = tostring(var.redis_port)
      }
      env {
        key   = "REDIS_USER"
        value = var.redis_username
      }
      env {
        key   = "REDIS_PASSWORD"
        value = var.redis_password
      }
      env {
        key   = "REDIS_NAME"
        value = var.redis_schema
      }
      env {
        key   = "JWT_PUBLIC"
        value = var.env_jwt_public
      }
      env {
        key   = "JWT_PRIVATE"
        value = var.env_jwt_private
      }
      env {
        key   = "JWT_EXPIRATION"
        value = var.env_jwt_expiration
      }
      env {
        key   = "JWT_ALGORITHM"
        value = var.env_jwt_algorithm
      }
    }
  }
}

output "urn" {
  value = "do:app:${digitalocean_app.application.id}"
}

output "domain" {
  value = replace(digitalocean_app.application.live_url, "https://", "")
}
