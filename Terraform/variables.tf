# Secrets
variable "token" { type = string }
variable "spaces_id" { type = string }
variable "spaces_key" { type = string }

# Project
variable "project_environment" { type = string }
variable "project_name" { type = string }
variable "project_purpose" { type = string }
variable "project_description" { type = string }

# CPU Alert
variable "alert_cpu_rule" { type = string }
variable "alert_cpu_operator" { type = string }
variable "alert_cpu_window" { type = string }
variable "alert_cpu_value" { type = number }
variable "alert_cpu_disabled" { type = bool }

# RAM Alert
variable "alert_ram_rule" { type = string }
variable "alert_ram_operator" { type = string }
variable "alert_ram_window" { type = string }
variable "alert_ram_value" { type = number }
variable "alert_ram_disabled" { type = bool }

# Application
variable "application_domain" { type = string }
variable "application_subdomain" { type = string }
variable "application_name" { type = string }
variable "application_region" { type = string }
variable "application_alert" { type = string }

# Storage
variable "storage_visibility" { type = string }
variable "storage_destroy" { type = bool }

# Database
variable "database_engine" { type = string }
variable "database_version" { type = string }
variable "database_size" { type = string }
variable "database_nodes" { type = number }
variable "database_production" { type = bool }

# Redis
variable "redis_version" { type = string }
variable "redis_size" { type = string }
variable "redis_nodes" { type = number }
variable "redis_production" { type = bool }

# Repository
variable "web_git_repository" { type = string }
variable "web_git_branch" { type = string }
variable "web_git_auto_deploy" { type = bool }

# Code
variable "web_code_source" { type = string }
variable "web_code_build" { type = string }
variable "web_code_run" { type = string }

# Server
variable "web_server_type" { type = string }
variable "web_server_size" { type = string }
variable "web_server_port" { type = number }
variable "web_server_route" { type = string }
variable "web_server_replicas" { type = number }

# Healthcheck
variable "web_healthcheck_path" { type = string }
variable "web_healthcheck_wait" { type = number }
variable "web_healthcheck_frequency" { type = number }
variable "web_healthcheck_timeout" { type = number }
variable "web_healthcheck_failures" { type = number }
variable "web_healthcheck_successes" { type = number }

# Environment
variable "web_environment_database_poll_size" { type = number }
variable "web_environment_database_schema_sync" { type = bool }
variable "web_environment_database_schema_drop" { type = bool }
variable "web_environment_jwt_public" { type = string }
variable "web_environment_jwt_private" { type = string }
variable "web_environment_jwt_expiration" { type = string }
variable "web_environment_jwt_algorithm" { type = string }
