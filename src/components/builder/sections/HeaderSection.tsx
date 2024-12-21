// components/builder/sections/HeaderSection.tsx
interface HeaderSectionProps {
    content: {
      title: string
      subtitle: string
    }
    isActive: boolean
    onClick: () => void
    onUpdate: (data: any) => void
  }
  
  export function HeaderSection({ content, isActive, onClick, onUpdate }: HeaderSectionProps) {
    if (!isActive) {
      return (
        <div 
          className="p-6 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={onClick}
        >
          <h1 className="text-4xl font-bold">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-600">{content.subtitle}</p>
        </div>
      )
    }
  
    return (
      <div className="p-6 bg-white rounded-lg shadow ring-2 ring-blue-500">
        <input
          type="text"
          value={content.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="w-full text-4xl font-bold border-0 focus:ring-0 p-0"
          placeholder="Enter title..."
        />
        <textarea
          value={content.subtitle}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          className="w-full mt-4 text-xl text-gray-600 border-0 focus:ring-0 p-0 resize-none"
          placeholder="Enter subtitle..."
        />
      </div>
    )
  }
  