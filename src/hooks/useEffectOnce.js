import { useRef, useEffect } from "react";

const useEffectOnce = (callback, dependencies) => {
	const hasRun = useRef(false);
	useEffect(() => {
		if (!hasRun.current) {
			callback();
			hasRun.current = true;
		}
	}, [...dependencies]);
};

export default useEffectOnce;
