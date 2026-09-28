# Instructor answer

The input is a typed map of objects with an optional string attribute.
When that optional attribute is omitted, Terraform inserts a null value unless
an optional-attribute default is specified. The attribute is therefore present:
`lookup(service, "owner", "platform")` does not replace its null value.
An empty string is also a present value, so lookup preserves it.

The answer uses `coalesce(service.owner, "platform")`, which chooses the first
argument that is neither null nor an empty string. A non-empty owner survives,
while the non-empty literal supplies a fallback for the other inputs.
This does not trim whitespace; that is deliberately outside the stated rule.

An alternative is `optional(string, "platform")`, but that alone addresses
omitted and null values, not an explicitly empty string. It does not satisfy
all the acceptance cases here.

Teaching check: ask the learner why a lookup default and an optional-attribute
default do not cover exactly the same situations as coalesce. Grade the stated
input/output behavior, rather than requiring a particular spelling.

Official references (checked 2026-09-28):
- [Optional object attributes](https://developer.hashicorp.com/terraform/language/expressions/type-constraints#optional-object-type-attributes)
- [lookup](https://developer.hashicorp.com/terraform/language/functions/lookup)
- [coalesce](https://developer.hashicorp.com/terraform/language/functions/coalesce)
- [Native tests and plan runs](https://developer.hashicorp.com/terraform/language/tests)

These references explain Terraform semantics; they are not endorsements.
