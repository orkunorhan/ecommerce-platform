import contactInfo from "../../data/contactInfo";
import ContactInfoCard from "./ContactInfoCard";

function ContactInfo() {
    return (
        <section className="flex w-full flex-col items-center bg-[#FAFAFA] px-6 py-20 lg:bg-white lg:py-28">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm font-bold uppercase leading-6 tracking-[0.2px] text-[#252B42]">
                    Visit Our Office
                </p>

                <h2 className="mt-[10px] max-w-[470px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
                    We help small businesses with big ideas
                </h2>
            </div>

            <div className="mt-20 flex w-full max-w-[985px] flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-center lg:gap-0">
                {contactInfo.map((item) => (
                    <ContactInfoCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
}

export default ContactInfo;
