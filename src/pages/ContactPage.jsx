import ContactHero from "../components/contact/ContactHero";
import contactHero from "../data/contactHero";

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
        </>
    );
}

export default ContactPage;
