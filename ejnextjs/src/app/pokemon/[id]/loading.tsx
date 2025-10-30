import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
    return (
    <div style={{ padding: 12 }}>
        <h1><Skeleton width={200} /></h1>
        <Skeleton width={300} height={12} />
    </div>
    );
}