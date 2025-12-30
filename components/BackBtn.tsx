import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button'

type Props = {
    onClick: () => void
}
export default function BackBtn({ onClick }: Props) {
    return (
        <Button onClick={onClick} className="cursor-pointer md:text-lg text-base"><ArrowLeft />Retour</Button>
    )
}
