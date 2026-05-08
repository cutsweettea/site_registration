import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";

interface VerifyProps {
    element: JSX.Element;
    redir: string
}

export default function Verify({ element, redir }: VerifyProps) {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isValidRef, setIsValidRef ] = useState<boolean>(false);

    const { ref } = useParams();
    if(!ref) {
        window.location.href = redir;
        setIsLoading(false);
    } else {
        useEffect(() => {
            fetch('https://api.jugg.school/invite/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ref: ref
                })
            }).then(res => res.json()).then(data => {
                setIsValidRef(data['success']);
                setIsLoading(false);
            });
        });
    }

    if(isLoading) return null;
    if(isValidRef) return element;
    else return null;
}