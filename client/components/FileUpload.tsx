import React, { useRef } from 'react'


interface Props {
	setFile: Function
	children: React.ReactNode
}

export function FileUpload({setFile, children}: Props) {
	const ref = useRef<HTMLInputElement>(null)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files?.[0])
	}
	return <div onClick={() => ref.current?.click()}>
		<input 
			type="file" 
			ref={ref}
			style={{display: 'none'}}
			onChange={handleChange}
			accept="image/*"
		/>
		{children}
	</div>
}
