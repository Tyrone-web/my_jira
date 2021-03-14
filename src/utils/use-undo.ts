import { useCallback, useState } from "react"

export const useUndo = <T>(initailPresent: T) => {
  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initailPresent,
    future: []
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    })
  }, []);

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const { past, present } = currentState;
      if (present === newPresent) return currentState

      return {
        past: [...past, newPresent],
        present: newPresent,
        future: []
      }
    })
  }, []);

  const reset = (newPreset: T) => {
    setState(() => ({
      past: [],
      present: newPreset,
      future: []
    }))
  };

  return [
    state,
    {
      set,
      reset,
      undo,
      redo,
      canUndo,
      canRedo
    }
  ] as const
}