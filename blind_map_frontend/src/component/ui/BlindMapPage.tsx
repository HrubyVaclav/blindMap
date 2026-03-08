import { useEffect, useState } from "react";

type StoredImage = {
    name: string;
    data: string;
};

const BlindMapPage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("savedImage");
        if (saved) {
            const parsed: StoredImage = JSON.parse(saved);
            setImage(parsed.data);
            setImageName(parsed.name);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const saveToLocalStorage = () => {
        if (!image || !imageName) {
            alert("Please select an image and enter a name.");
            return;
        }

        const payload: StoredImage = {
            name: imageName,
            data: image,
        };

        localStorage.setItem("savedImage", JSON.stringify(payload));
        alert("Image saved!");
    };

    const clearStorage = () => {
        localStorage.removeItem("savedImage");
        setImage(null);
        setImageName("");
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Image Loader</h1>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    placeholder="Enter image name"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                />
            </div>

            {image && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Preview</h3>
                    <img
                        src={image}
                        alt="Preview"
                        style={{ maxWidth: "400px", display: "block", marginBottom: "10px" }}
                    />

                    <button onClick={saveToLocalStorage}>Save to localStorage</button>
                    <button onClick={clearStorage} style={{ marginLeft: "10px" }}>
                        Clear saved image
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlindMapPage;