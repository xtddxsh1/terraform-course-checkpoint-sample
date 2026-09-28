run "empty_owner" {
  command = plan

  variables {
    services = { worker = { owner = "" } }
  }

  assert {
    condition     = output.owner_by_service["worker"] == "platform"
    error_message = "An empty owner must become platform."
  }
}
