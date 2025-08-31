
function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="fixed bottom-0 w-full bg-blue-600 text-white text-center py-4 shadow" >
            <p>© {year} Vaccine Reminder App. All rights reserved.</p>
        </footer >
    )
}

export default Footer