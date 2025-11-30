import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contacts = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls  target="contact"/>
                <h2>Contact Me</h2>
            </div>
            <div className="p-5 space-y-5">
                <img className="w-20 rounded-full" src="/images/shivam.png" alt="Shivam" />

                <h3>Let's connect</h3>
                <p>Got an idea? A bug to squash? Or just wanna talk? I'm in.</p>
                <p>Send me an email at <span className="text-blue-500">shivamgarade05@gmail.com</span></p>

                <ul>
                    {socials.map(({id,bg,link,icon,text}) => (
                        <li key={id} style={{backgroundColor:bg}}>
                            <a href={link}>
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

const ContactWindow = WindowWrapper(Contacts, 'contact')

export default ContactWindow;