

interface MantraProps{
    content: string;
    label: string;
    count: number;
    image: string;
}

const Mantra: React.FC<MantraProps> = ({image, content, count, label}) => {
    return (
        <div>
            <img src={image} alt="" width={100} height={100}/>
        </div>
    )
}

export default Mantra;