import { updateInstance } from "../utils";
import { currElmForHook, rootInstance } from "../reconciler";

export function Hooks() {
  return {
    useState: (initial) => {
      const oldHook =
        currElmForHook.oldInstance &&
        currElmForHook.oldInstance.hooks &&
        currElmForHook.oldInstance.hooks[currElmForHook.hookIndex];

      const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
      };

      const actions = oldHook ? oldHook.queue : [];
      actions.forEach((action) => {
        hook.state = action(hook.state);
      });

      const setState = (action) => {
        hook.queue.push(action);

        requestIdleCallback(() => updateInstance(rootInstance));
      };
      currElmForHook.hooks.push(hook);
      currElmForHook.hookIndex++;
      return [hook.state, setState];
    },
  };
}
