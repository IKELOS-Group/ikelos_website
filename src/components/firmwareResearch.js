// Conceptual process only. These records describe evidence requirements, not results.
export const firmwareStages = [
  {
    title: 'Firmware image', domain: 'Analysis input', artifact: 'Firmware inventory',
    action: 'Unpack the available firmware and inventory executable components, shared libraries, configuration, and dependencies. Record image provenance and architecture.',
    evidence: 'An inventory linking each analyzed component to its source image and version.',
    limit: 'Encrypted, incomplete, or unsupported images can limit coverage. An inventory does not establish reachability.',
  },
  {
    title: 'Program model', domain: 'Deterministic analysis', artifact: 'Inspectable program model',
    action: 'Use Ghidra-backed reverse engineering to recover functions, references, and program relationships that can be inspected alongside the underlying binary.',
    evidence: 'Function and reference records tied to concrete locations in the original executable.',
    limit: 'Recovered models can be incomplete. Indirect calls and runtime state may require further investigation.',
  },
  {
    title: 'Cross-binary analysis', domain: 'Deterministic analysis', artifact: 'Source-to-sink hypothesis',
    action: 'Investigate dependencies and dataflow across executables and shared libraries. Examine how input reaches a sensitive operation, including authentication and privilege context.',
    evidence: 'An inspectable chain of code references, boundary conditions, and unresolved links across components.',
    limit: 'A static path is a hypothesis about possible behavior; it does not demonstrate execution under attacker-controlled conditions.',
  },
  {
    title: 'Candidate hypothesis', domain: 'AI-assisted review · Human assessment', artifact: 'Reviewed vulnerability hypothesis',
    action: 'Evidence-constrained AI agents support investigation and independent adversarial review of candidate findings. Researchers assess the supporting references, challenge assumptions, and select questions for testing.',
    evidence: 'A candidate claim with its prerequisites, supporting evidence, counterarguments, and remaining uncertainty.',
    limit: 'Agreement between automated reviewers is not validation. Unsupported claims remain unresolved or are rejected.',
  },
  {
    title: 'Validation contract', domain: 'Researcher-defined experiment', artifact: 'Bounded test specification',
    action: 'Define the input, access prerequisites, environment, expected observable behavior, and criteria that would support or contradict the hypothesis. Identify any modeled interfaces.',
    evidence: 'A repeatable procedure, baseline, observation requirements, and explicit fidelity assumptions.',
    limit: 'A test contract defines what an experiment could establish. It is not proof that a candidate will reproduce.',
  },
  {
    title: 'Isolated execution', domain: 'Controlled execution', artifact: 'Instrumented experiment',
    action: 'Rehost selected original firmware binaries in an isolated research environment. Supply required dependencies and emulate or simulate unavailable interfaces where feasible.',
    evidence: 'Experiment configuration and observations of processes, system calls, file changes, responses, and crashes.',
    limit: 'A substituted interface can change behavior. Record which components execute and which interactions are simulated.',
  },
  {
    title: 'Observed evidence', domain: 'Execution evidence · Human interpretation', artifact: 'Reproducible evidence package',
    action: 'Compare observed behavior with the validation contract. Preserve execution traces, inputs, environment details, and reproduction steps; record failures and contradictory observations.',
    evidence: 'A demonstrated mechanism where validation succeeds, or a bounded negative result or unresolved hypothesis.',
    limit: 'A crash alone does not establish an exploit mechanism. Reachability and authentication require their own evidence; emulated behavior does not establish a physical or operational consequence.',
  },
  {
    title: 'Engineering decision', domain: 'System-level reasoning', artifact: 'Decision and retest criteria',
    action: 'Relate implementation evidence to the system model. Inform implementation, architecture, access-control, or operating changes and identify the evidence required for retesting.',
    evidence: 'Recommendations traceable to observations, model assumptions, coverage limits, and the stakeholder’s decision.',
    limit: 'Modeled system effects and unverified operational consequences remain distinct from demonstrated implementation behavior.',
  },
];

export const emulationIntegration = [
  'Define the mission function, unacceptable consequences, and the decision the investigation must support.',
  'Identify controllers, controlled processes, feedback, authority boundaries, and operating assumptions. Define what the research environment must represent.',
  'Translate system security hypotheses into specific implementation behaviors to investigate; do not treat a causal scenario as a confirmed attack path.',
  'Examine firmware, software, protocols, and component interfaces to assess whether the hypothesized conditions are technically plausible.',
  'Reproduce implementation behavior in controlled experiments. Investigate control interactions only to the extent supported by the model’s fidelity.',
  'Use the evidence to inform implementation, architecture, access controls, operational constraints, or validation requirements. Revise the model when evidence changes its assumptions.',
];
