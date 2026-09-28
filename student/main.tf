terraform {
  required_version = ">= 1.6, < 2.0"
}

variable "services" {
  description = "Each service may provide an owner."
  type = map(object({
    owner = optional(string)
  }))
  nullable = false
}

locals {
  owner_by_service = {
    for name, service in var.services :
    name => lookup(service, "owner", "platform")
  }
}

output "owner_by_service" {
  value = local.owner_by_service
}
