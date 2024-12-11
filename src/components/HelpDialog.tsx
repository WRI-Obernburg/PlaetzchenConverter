"use client";
import {  useState } from "react";
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {HelpCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function HelpDialog(props: {onExampleLoad: (e:File)=> void}) {
    const [open, setOpen] = useState(false);
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger> <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="#"
            rel="noopener noreferrer"
        >
            <HelpCircle
                aria-hidden
                width={16}
                height={16}
            />
            Hilfe
        </a></DialogTrigger>
        <DialogContent className={"max-h-[60vh] max-w-[50vw] overflow-y-hidden"}>
            <DialogHeader>
                <DialogTitle className={"text-2xl"}>Informationen zum Plätzchen-Converter</DialogTitle>
                <DialogDescription className={"text-xl pt-4 flex justify-center"} asChild>

                    <div className={"flex flex-col gap-6"}>
                        <ul className={"flex gap-3 flex-col list-disc pl-5"}>
                            <li>Das ShaperTools Trace kann genutzt werden, um eine Zeichnung eines Ausstechers zu
                                digitalisieren
                            </li>
                            <li>Zeichnung mit Filzstift nachfahren, sonst keine Striche auf dem Blatt</li>
                            <li>Spitze Kanten sind zu vermeiden, da es beim Scan-Prozess zu Problemen führen kann</li>
                            <li>Es darf nur eine Außenkontur existieren</li>
                            <li>Konturen müssen geschlossen sein</li>
                            <li>Skalierung kann von 10%-200% als Parameter eingestellt werden</li>
                            <li>Druck nicht im Slicer skalieren!</li>
                            <li>Für den 3D-Druck lebensmittelechtes Filament nutzen!</li>
                        </ul>
                        <Button className={"w-1/2 self-center"} onClick={async () => {
                            setOpen(false);
                            const file = await fetch("/example.svg").then((response) => response.blob()).then((blob) => new File([blob], "example.svg", {type: "image/svg+xml"}));
                            props.onExampleLoad(file);

                        }}>Beispiel laden</Button>
                    </div>


                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}