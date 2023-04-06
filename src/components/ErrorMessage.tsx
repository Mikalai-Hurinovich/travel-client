import React from 'react';

interface ErrorMessageProps {
	text: string,
	withIcon?: boolean
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({text, withIcon = true}): JSX.Element => {
	return (
		<div className="error flex items-center py-1.5 pl-1 gap-2">
			{withIcon &&
          <span className="flex align-end -mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
          </span>
			}
			{text}
		</div>
	);
};

export default ErrorMessage;
