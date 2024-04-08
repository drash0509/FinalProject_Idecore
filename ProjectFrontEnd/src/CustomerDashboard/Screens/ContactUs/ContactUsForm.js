import React from 'react';

const ContactUsForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted');
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center   p-5 md:p-10 bg-white rounded-lg shadow-md m-auto my-5 md:my-10 max-w-full md:max-w-6xl">
            <div className="flex-1 mb-5 md:mb-0 md:mr-5">
                <h2 className="text-xl md:text-3xl text-[#504238] mb-4 md:mb-5 text-left"><strong>Contact Details</strong></h2>
                <p className='mx-0 m-2'><strong>Address:</strong> Surat, Gujarat</p>
                <p className='mx-0 m-2'><strong>Email:</strong> contact@idecore.com</p>
                <p className='mx-0 m-2'><strong>Phone:</strong> +123 456 7890</p>
            </div>
            <div className="flex-1 bg-[#F6EFEA] p-5 md:p-10">
                <form onSubmit={handleSubmit} className="flex flex-col max-w-md m-auto">
                    <h2 className="text-xl md:text-4xl text-[#504238] mb-4 md:mb-5 text-left"><strong>
                    Contact Us
                    </strong></h2>
                    <div className="mb-4 flex flex-col ">
                        <label htmlFor="name" className="mb-2  text-[#504238]"><strong>Name</strong></label>
                        <input type="text" id="name" name="name" required className="p-2 rounded-lg border border-gray-300 text-lg" />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="email" className="mb-2 text-[#504238]"><strong>Email</strong></label>
                        <input type="email" id="email" name="email" required className="p-2 rounded-lg border border-gray-300 text-lg" />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="message" className="mb-2 text-[#504238]"><strong>Message</strong></label>
                        <textarea id="message" name="message" required className="p-2 rounded-lg border border-gray-300 text-lg h-32 mt-2"></textarea>
                    </div>
                    <button type="submit" className="py-2 px-4 bg-[#504238] text-white rounded-lg text-lg cursor-pointer hover:bg-[#40332f] transition-colors duration-300 mt-4 self-start">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUsForm;
