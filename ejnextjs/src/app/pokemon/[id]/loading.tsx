import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
    return (
    <div style={{ padding: 12 }}>
        <h1><Skeleton width={200} /></h1>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton width={200} height={200} borderRadius={12} />
        <div style={{ flex: 1 }}>
            <Skeleton width="60%" height={16} />
            <div style={{ height: 8 }} />
            <Skeleton width="40%" height={12} />
        </div>
    </div>
    </div>
);
}