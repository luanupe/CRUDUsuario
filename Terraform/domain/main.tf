terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}

resource "digitalocean_domain" "domain" {
  name  = var.http_domain
}

output "urn" {
  value = digitalocean_domain.domain.urn
}
