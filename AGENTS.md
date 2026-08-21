# Frontend Guidelines

## 🔍 Contextual Exploration & Adaptation

- **Analyze Before Acting:** Before writing or modifying any code, deeply explore the workspace to understand the project's existing architecture, file organization, and naming conventions.
- **Architectural Mimicry:** Identify how the current project separates logic, state, and UI. Whether it uses custom hooks, state machines, or plain utility files, adapt your implementation to flawlessly match the established pattern. Do not introduce foreign structural concepts.
- **Seamless Integration:** Place new files and group modules exactly how the current project does (e.g., feature-based vs. type-based folders).

## 🧩 Universal Modularity & Reusability

- **Single Responsibility:** Keep functions and modules focused on a single task. Break down complex logic based on the project's existing breakdown style.
- **Component Folder Structure:** Every page (e.g., `overview`, `deals`) MUST have a `_components` directory. Inside `_components`, break the page down into smaller logical sections, each in its own folder (e.g., `OverviewStats/OverviewStats.tsx`). The main `page.tsx` should only import and arrange these sub-components.
- **DRY (Don't Repeat Yourself):** Actively search for existing shared components, utilities, or helpers before creating new ones. Never duplicate logic or UI patterns.

## ⚡ Performance & Optimization

- **Efficient Rendering:** Write efficient state and DOM updates according to the framework being used. Avoid unnecessary re-renders or repaints.
- **Resource Management:** Keep global state minimal. Load heavy resources or non-critical assets asynchronously if the project supports it.

## 🛡️ Code Quality & Resiliency

- **Strict Typing (If Applicable):** If the project uses TypeScript or any type system, strictly enforce types/interfaces. Do not use `any`.
- **Graceful Handling:** Always account for 'loading', 'error', and 'empty' states during data fetching or asynchronous operations.
- **Clean & Readable:** Use self-documenting variable names. Prefer early returns to prevent deep nesting.

## 🛑 Workflow & Execution Constraints

- **Explicit Approval Required:** Do not modify any codebase files (e.g., editing files, running commands that alter the codebase) without first explaining the exact proposed changes to the user. You MUST wait for explicit user approval before applying any updates.
