# Remaining manual steps:
# * Route53 Hosted Zone creation

provider "aws" {
  region  = "us-east-1"
}

# Generated by "terraform_state_backend" module, below
terraform {
  backend "s3" {
    region         = "us-east-1"
    bucket         = "lofiskeptic-prod-terraform-state"
    key            = "terraform.tfstate"
    dynamodb_table = "lofiskeptic-prod-terraform-state-lock"
    encrypt        = true
  }
}

variable site_hostname {
  type    = string
  default = "lofiskeptic.com"
}

variable "site_namespace" {
  type    = string
  default = "lofiskeptic"
}

variable "site_stage" {
  type = string
  default = "prod"
}

module "terraform_state_backend" {
  source        = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=tags/0.9.0"
  namespace     = var.site_namespace
  stage         = var.site_stage
  name          = "terraform"
  attributes    = ["state"]
  region        = "us-east-1"
}

module "acm_request_certificate" {
  source                            = "git::https://github.com/cloudposse/terraform-aws-acm-request-certificate.git?ref=tags/0.4.0"
  domain_name                       = var.site_hostname
  process_domain_validation_options = true
  ttl                               = "300"
  subject_alternative_names         = ["*.${var.site_hostname}"]
}

module "cdn" {
  source              = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=tags/0.18.0"
  acm_certificate_arn = module.acm_request_certificate.id
  namespace           = var.site_namespace
  stage               = var.site_stage
  name                = var.site_namespace
  aliases             = ["www.${var.site_hostname}"]
  parent_zone_name    = var.site_hostname

  # default_ttl
  # redirect_all_requests_to
  # routing_rules
}

# https://github.com/cloudposse/terraform-aws-iam-system-user