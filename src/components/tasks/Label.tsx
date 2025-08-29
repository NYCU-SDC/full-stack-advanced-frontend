import {Badge} from "@/components/ui/badge.tsx";

export default function Label({ label }: { label: string }) {
    return (
        <Badge variant="outline" className="border-black">
            {label}
        </Badge>
    )
}