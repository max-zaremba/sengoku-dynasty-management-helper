import { Checkbox } from './ui/checkbox';

export const TableControls = (props: {
	devMode: boolean;
	onDevModeCheckedChange: () => void;
}) => {
	return (
		<div className='p-4 py-2 mx-auto bg-green-950 rounded-xl border max-w-4xl m-[10px]'>
			<label className='text-lg'>Developer Mode: </label>
			<Checkbox
				checked={props.devMode}
				onCheckedChange={props.onDevModeCheckedChange}
			/>
		</div>
	);
};
