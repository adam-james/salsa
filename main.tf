# Variables

variable "client_id" {}
variable "client_secret" {}
variable "admin_name" {}
variable "admin_password" {}
variable "my_ip" {}

variable "location" {
  description = "Azure Region"
  default     = "eastus"
}

# Resources

resource "azurerm_resource_group" "salsa_rg" {
  name     = "salsa_rg"
  location = var.location
}

resource "azurerm_container_registry" "salsa_cr" {
  name                = "salsacr"
  resource_group_name = azurerm_resource_group.salsa_rg.name
  location            = var.location
  sku                 = "Basic"
}

resource "azurerm_postgresql_server" "salsa_db" {
  name                = "salsa-db"
  location            = azurerm_resource_group.salsa_rg.location
  resource_group_name = azurerm_resource_group.salsa_rg.name

  sku_name = "B_Gen5_2"

  storage_profile {
    storage_mb            = 5120
    backup_retention_days = 7
    geo_redundant_backup  = "Disabled"
    auto_grow             = "Enabled"
  }

  administrator_login          = var.admin_name
  administrator_login_password = var.admin_password
  version                      = "9.5"
  # TODO! enable
  ssl_enforcement              = "Disabled"
}

resource "azurerm_postgresql_firewall_rule" "allow_all_ips" {
  # TODO! limit IPs in this rule
  name                = "AllowAllIPs"
  resource_group_name = azurerm_resource_group.salsa_rg.name
  server_name         = azurerm_postgresql_server.salsa_db.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}

resource "azurerm_postgresql_firewall_rule" "allow_my_ips" {
  name                = "AllowMyIP"
  resource_group_name = azurerm_resource_group.salsa_rg.name
  server_name         = azurerm_postgresql_server.salsa_db.name
  start_ip_address    = var.my_ip
  end_ip_address      = var.my_ip
}

resource "azurerm_kubernetes_cluster" "salsa_cluster" {
  name                = "salsa_cluster"
  location            = azurerm_resource_group.salsa_rg.location
  resource_group_name = azurerm_resource_group.salsa_rg.name
  dns_prefix          = "salsa-cluster"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  service_principal {
    client_id     = var.client_id
    client_secret = var.client_secret
  }

  tags = {
    Environment = "Production"
  }
}
