terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_database_cluster" "database" {
  name       = lower("cluster-${var.database_engine}-${var.app_name}-${var.app_env}")
  engine     = lower(var.database_engine)
  version    = var.database_version
  size       = var.database_size
  region     = var.app_region
  node_count = var.database_nodes
}

output "urn" {
  value = digitalocean_database_cluster.database.urn
}

output "cluster" {
  value = digitalocean_database_cluster.database.name
}

output "engine" {
  value = digitalocean_database_cluster.database.engine
}

output "host" {
  value = digitalocean_database_cluster.database.host
}

output "port" {
  value = digitalocean_database_cluster.database.port
}

output "username" {
  value = digitalocean_database_cluster.database.user
}

output "password" {
  value = digitalocean_database_cluster.database.password
}

output "schema" {
  value = digitalocean_database_cluster.database.database
}
