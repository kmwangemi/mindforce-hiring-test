import { useState, useEffect, useRef, useCallback } from 'react';
import DOMPurify from 'dompurify';
import useKeyPress from '../../hooks/useKeyPress';
import useOnClickOutside from '../../hooks/useOnClickOutside';

import './inlineedit.scss';

const InlineEdit = (props: any) => {
	const [isInputActive, setIsInputActive] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(props.text);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLInputElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const enter = useKeyPress('Enter');
	const esc = useKeyPress('Escape');

	const { onSetText } = props;

	// check to see if the user clicked outside of this component
	useOnClickOutside(wrapperRef, () => {
		if (isInputActive) {
			onSetText(inputValue);
			setIsInputActive(false);
		}
	});

	const onEnter = useCallback(() => {
		if (enter) {
			onSetText(inputValue);
			setIsInputActive(false);
		}
	}, [enter, inputValue, onSetText]);

	const onEsc = useCallback(() => {
		if (esc) {
			setInputValue(props.text);
			setIsInputActive(false);
		}
	}, [esc, props.text]);

	// focus the cursor in the input field on edit start
	useEffect(() => {
		if (isInputActive) {
			inputRef?.current?.focus();
		}
	}, [isInputActive]);

	useEffect(() => {
		if (isInputActive) {
			// if Enter is pressed, save the text and close the editor
			onEnter();
			// if Escape is pressed, revert the text and close the editor
			onEsc();
		}
	}, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

	const handleInputChange = useCallback(
		(event) => {
			// sanitize the input a little
			setInputValue(DOMPurify.sanitize(event.target.value));
		},
		[setInputValue]
	);

	const handleSpanClick = useCallback(
		() => setIsInputActive(true),
		[setIsInputActive]
	);

	return (
		<div className='text__Container' ref={wrapperRef}>
			<span
				ref={textRef}
				onClick={handleSpanClick}
				className={`inline-text_copy inline-text_copy--${
					!isInputActive ? 'active' : 'hidden'
				}`}
			>
				{props.text}
			</span>
			<input
				ref={inputRef}
            style={{ width: '100%' }}
				value={inputValue}
				onChange={handleInputChange}
				className={`inline-text_input inline-text_input--${
					isInputActive ? 'active' : 'hidden'
				}`}
			/>
		</div>
	);
}

export default InlineEdit;
