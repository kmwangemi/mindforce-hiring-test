// hook from https://usehooks.com/useKeyPress/
import { useState, useEffect } from 'react';

// Hook
const useKeyPress = (targetKey: string): boolean => {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState<boolean>(false);

	// If pressed key is our target key then set to true
	const downHandler = ({ key }: { key: string }): void => {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	};

	// If released key is our target key then set to false
	const upHandler = ({ key }: { key: string }): void => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return keyPressed;
};

export default useKeyPress;
