
import React, { useState, useCallback } from 'react';
import type { RoomType, SubjectType } from './types/mockup';
import { generateMockup } from './services/mockupService';
import Spinner from './components/Spinner';
import UploadIcon from './components/icons/UploadIcon';

const roomOptions: { id: RoomType; label: string }[] = [
  { id: 'living_room', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'home_office', label: 'Home Office' },
];

const subjectOptions: { id: SubjectType; label: string }[] = [
    { id: 'woman', label: 'Woman' },
    { id: 'man', label: 'Man' },
    { id: 'child', label: 'Child' },
    { id: 'couple', label: 'Couple' },
    { id: 'family', label: 'Family' },
    { id: 'grandparents', label: 'Grandparents' },
];


const App: React.FC = () => {
  const [wallpaperDescription, setWallpaperDescription] = useState<string>('');
  const [wallpaperFile, setWallpaperFile] = useState<File | null>(null);
  const [roomType, setRoomType] = useState<RoomType>('living_room');
  const [subjectType, setSubjectType] = useState<SubjectType>('woman');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWallpaperFile(e.target.files[0]);
      if (!wallpaperDescription) {
        setWallpaperDescription(`Custom pattern from uploaded file: ${e.target.files[0].name}`);
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setWallpaperFile(e.dataTransfer.files[0]);
        if (!wallpaperDescription) {
            setWallpaperDescription(`Custom pattern from uploaded file: ${e.dataTransfer.files[0].name}`);
        }
    }
  }, [wallpaperDescription]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wallpaperDescription.trim()) {
      setError('Please provide a wallpaper description or upload a file.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateMockup(wallpaperDescription, roomType, subjectType, wallpaperFile);
      setGeneratedImages(images);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            California Room Mockups
          </h1>
          <p className="mt-2 text-lg text-gray-400">Generate photorealistic mockups for your wallpaper shop.</p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="wallpaper-description" className="block text-sm font-medium text-gray-300 mb-2">
                1. Wallpaper Design
              </label>
              <p className="text-xs text-gray-500 mb-2">Describe your wallpaper or upload an image.</p>
              <textarea
                id="wallpaper-description"
                rows={3}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-500"
                placeholder="e.g., 'Minimalist wallpaper with thin vertical gold lines on a sage green background'"
                value={wallpaperDescription}
                onChange={(e) => setWallpaperDescription(e.target.value)}
              />
              <div className="text-center my-4 text-gray-500 text-sm">OR</div>
                <label 
                  htmlFor="file-upload" 
                  className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-800/60 transition"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 mb-3 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-600">PNG, JPG, or WEBP</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                </label>
              {wallpaperFile && (
                <p className="text-sm text-green-400 mt-2 text-center">
                  File selected: {wallpaperFile.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">2. Choose Room Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {roomOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name="roomType"
                      value={option.id}
                      checked={roomType === option.id}
                      onChange={() => setRoomType(option.id)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={option.id}
                      className="inline-flex items-center justify-center w-full p-4 text-gray-400 bg-gray-900/50 border-2 border-gray-700 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:text-indigo-400 hover:text-gray-300 hover:bg-gray-800/60 transition duration-200"
                    >
                      <span className="w-full text-center">{option.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">3. Choose Subject</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {subjectOptions.map((option) => (
                  <div key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name="subjectType"
                      value={option.id}
                      checked={subjectType === option.id}
                      onChange={() => setSubjectType(option.id)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={option.id}
                      className="inline-flex items-center justify-center w-full p-4 text-gray-400 bg-gray-900/50 border-2 border-gray-700 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:text-indigo-400 hover:text-gray-300 hover:bg-gray-800/60 transition duration-200"
                    >
                      <span className="w-full text-center">{option.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !wallpaperDescription.trim()}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Generating...
                  </>
                ) : (
                  'Generate Mockups'
                )}
              </button>
            </div>
          </form>
        </main>
        
        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && (
            <div className="mt-10 text-center">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                </div>
                <p className="mt-4 text-gray-400">Conjuring up some Californian vibes... this can take a moment.</p>
            </div>
        )}

        {generatedImages.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Generated Mockups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {generatedImages.map((url, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                  <img src={url} alt={`Generated mockup ${index + 1}`} className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
