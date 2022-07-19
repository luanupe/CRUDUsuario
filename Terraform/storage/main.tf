terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_spaces_bucket" "storage" {
  name          = lower("${var.app_name}-${var.app_env}-${var.bucket_uuid}")
  region        = var.app_region
  acl           = var.bucket_visibility
  force_destroy = var.bucket_destroy
}

output "urn" {
  value = digitalocean_spaces_bucket.storage.urn
}

output "name" {
  value = digitalocean_spaces_bucket.storage.name
}

output "host" {
  value = digitalocean_spaces_bucket.storage.bucket_domain_name
}
