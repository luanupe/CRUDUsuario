# Project
project_name = "Modelo de IaC"
project_purpose = "Validar o modelo de infraestrutura"
project_description = "CRUD de usuários padrão"

# Application
application_alert = "DEPLOYMENT_FAILED"

# Repository
web_git_auto_deploy = false

# Code
web_code_source = "./app"
web_code_build = "npm run build"
web_code_run = "npm run start:prod"

# Environment
web_environment_database_poll_size = 1
web_environment_database_schema_sync = true
web_environment_database_schema_drop = false
web_environment_jwt_expiration = "12h"
web_environment_jwt_algorithm = "RS256"

# Storage
storage_visibility = "public-read"
storage_destroy = false

# Database
database_engine = "MYSQL"
database_version = "8"
database_size = "db-s-1vcpu-1gb"
database_nodes = 1
database_production = true

# Redis
redis_version = "6"
redis_size = "db-s-1vcpu-1gb"
redis_nodes = 1
redis_production = true

# Server
web_server_type = "node-js"
web_server_size = "basic-xxs"
web_server_port = 80
web_server_route = "/"
web_server_replicas = 1

# Healthcheck
web_healthcheck_path = "/healthcheck"
web_healthcheck_wait = 30
web_healthcheck_frequency = 15
web_healthcheck_timeout = 5
web_healthcheck_failures = 3
web_healthcheck_successes = 1

# CPU Alert
alert_cpu_rule = "CPU_UTILIZATION"
alert_cpu_operator = "GREATER_THAN"
alert_cpu_window = "TEN_MINUTES"
alert_cpu_value = 75
alert_cpu_disabled = false

# RAM Alert
alert_ram_rule = "MEM_UTILIZATION"
alert_ram_operator = "GREATER_THAN"
alert_ram_window = "TEN_MINUTES"
alert_ram_value = 95
alert_ram_disabled = false
