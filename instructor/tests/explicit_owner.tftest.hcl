run "explicit_owner" {
  command = plan

  variables {
    services = { api = { owner = "ops" }, web = { owner = "app" } }
  }

  assert {
    condition     = output.owner_by_service["api"] == "ops" && output.owner_by_service["web"] == "app"
    error_message = "Explicit, non-empty owners must be preserved."
  }
}
