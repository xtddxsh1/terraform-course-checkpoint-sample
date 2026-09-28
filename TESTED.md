# Execution evidence

Checked 2026-09-28 on Windows amd64 with Terraform CLI 1.16.4.

- Official ZIP: https://releases.hashicorp.com/terraform/1.16.4/terraform_1.16.4_windows_amd64.zip
- ZIP SHA256 matched the official checksum: 5c736ed6b0f13e98bc5029fe159574cca33634c3477466c56442c28b513a7054
- `terraform fmt -check -recursive`: passed in both folders.
- `terraform init -backend=false -input=false`: passed; no provider dependencies.
- `terraform validate`: passed in both folders.
- Student tests: **1 passed, 2 failed**, exit 1, as expected.
- Instructor tests: **3 passed, 0 failed**, exit 0.
- `node verify.mjs <terraform-path>`: verified both expected outcomes, exit 0.

The two student failures are missing/null owner and empty owner.
The explicit-owner case already works and remains a regression check.

This is local delivery verification, not learner feedback or customer acceptance.
No claim is made that other operating systems or Terraform versions were tested.
The executable is not redistributed in this repository.
