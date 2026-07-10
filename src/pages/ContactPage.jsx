import ContactHero from "../components/contact/ContactHero";
import contactHero from "../data/contactHero";
import ContactInfo from "../components/contact/ContactInfo";

function ContactPage() {
    return (
        <>
            <ContactHero
                title={contactHero.title}
                description={contactHero.description}
                actionText={contactHero.actionText}
                actionHref={contactHero.actionHref}
                backgroundImage={contactHero.backgroundImage}
            />
            <ContactInfo />
        </>
    );
}

export default ContactPage;
