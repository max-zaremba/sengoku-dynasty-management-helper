'use client';
import React from 'react';

import ItemTable from '@/components/item-table/item-table';
import { TableControls } from '@/components/table-controls';
import { TableDescription } from '@/components/table-decription';

const SengokuDynastyManager = () => {
	const [devMode, setDevMode] = React.useState(false);
	const onDevModeCheckedChange = () => setDevMode(!devMode);
	return (
		<div className='text-white min-h-screen'>
			<header className='bg-green-950 p-4 text-center'>
				<h1 className='text-3xl font-bold'>
					Sengoku Dynasty Management Helper
				</h1>
			</header>
			<div
				className='justify-center flex flex-col items-center'
				style={{ minHeight: 'calc(100vh - 64px)' }}
			>
				<main className='p-4 mx-auto bg-green-950 rounded-xl '>
					<TableDescription />
					<TableControls
						devMode={devMode}
						onDevModeCheckedChange={onDevModeCheckedChange}
					/>
					<ItemTable devMode={devMode} />
				</main>
			</div>
		</div>
	);
};

export default SengokuDynastyManager;
