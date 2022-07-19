terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_project" "project" {
  name        = var.project_name
  environment = var.project_env
  description = var.project_description
  purpose     = var.project_purpose
  resources   = var.project_resources
}
