import { useRef, useEffect, useMemo } from "react";

const useEffectOnce = (callback, dependencies) => {
	const triggerToReRun = useMemo(() => [...dependencies], [dependencies]);
	const hasRun = useRef(false);
	useEffect(() => {
		if (!hasRun.current) {
			callback();
			hasRun.current = true;
		}
	}, triggerToReRun);
};

export default useEffectOnce;
