run "missing_or_null" {
  command = plan

  variables {
    services = { api = {}, web = { owner = null } }
  }

  assert {
    condition     = output.owner_by_service["api"] == "platform" && output.owner_by_service["web"] == "platform"
    error_message = "Both an omitted owner and an explicit null must become platform."
  }
}
