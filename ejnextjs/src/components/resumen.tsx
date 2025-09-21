import Image from "next/image";

export default function TocaResumen() {
    return (
        <figure className="resumen-figure">
            <h2 style={{margin:"8px 0 0 0"}}>MEME</h2>
            <Image
                src="/meme.jpg"
                alt="Memazo papa"
                width={700}
                height={420}
                style={{borderRadius:10}}
            />
        </figure>
    );
}