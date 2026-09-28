# Terraform checkpoint: the fallback that does not fire

One original, provider-free debugging exercise for course instructors to evaluate.
This is a sample, not a certification exam question or an endorsed course resource.

## What a learner does

A small service map is used to produce owner labels. Every omitted, null or empty
owner must default to `platform`; an explicit non-empty owner must be preserved.
The starter configuration uses a lookup fallback but violates that rule.

Give learners **only the student folder and this task**. Ask them to:

1. Run the provided checks and explain the failing cases.
2. Change the expression in `local.owner_by_service` without hard-coding the inputs.
3. Keep all input types and tests unchanged; make every check pass.

Whitespace-only owners are outside this exercise: they are treated as explicit
values. Do not add cloud resources, providers, modules or a remote backend.

## Run the student exercise

Install Terraform CLI from [the official download page](https://developer.hashicorp.com/terraform/install).
This sample was executed on Terraform 1.16.4 on Windows amd64. The declared
minimum is 1.6 (the native test framework); older versions were not separately tested.
No cloud account or provider credentials are needed. After installing the CLI,
the supplied configurations use no provider/module downloads.

```sh
cd student
terraform init -backend=false -input=false
terraform validate
terraform test -no-color
```

A failing test run is intentional in the untouched student version. A working
solution must pass all three test files. These files use `command = plan` and
the sample contains no resources, providers, provisioners or data sources.

## Instructor files and acceptance

The separate `instructor/` folder contains the answer and the same tests;
`INSTRUCTOR.md` explains the reasoning. Do not distribute that folder as the
initial student handout. All cases must pass in the answer:

| Case | Expected result |
| --- | --- |
| Explicit non-empty owners | Original owner strings retained |
| Omitted or explicitly null owner | `platform` for both |
| Empty owner | `platform` |

Check the answer with the same commands from the instructor folder. The
untouched student must fail the missing/null and empty checks. This confirms
that the tests distinguish the original defect from the correction.

A maintainer can run `node verify.mjs /path/to/terraform` to verify both folders;
Node is not needed by students. The script does not modify the source files.

## Scope and reuse

Editable HCL, separated answers and automated acceptance checks are the reusable
format. No customer data, course slides, copied course code, trademarks, tokens
or paid-course content are included. The exercise is independently authored.
See LICENSE for the sample's reuse terms. A commissioned pack would have its
topics, acceptance, price and delivery date agreed separately.
