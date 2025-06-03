function Header() {
	return (
		<header className="sticky top-0 z-10 bg-white shadow-sm">
			<div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 py-4 sm:py-6 flex justify-between items-center">
				<h1 className="text-lg sm:text-xl font-bold text-gray-800">Budget Tracker</h1>

				{/* User section */}
				<button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
					<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
						<span className="text-white text-sm font-medium">EP</span>
					</div>
					<span className="font-medium text-gray-800 hidden sm:inline">Eric Pham</span>
				</button>
			</div>
		</header>
	);
}

export default Header;