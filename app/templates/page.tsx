
import TemplatePreview from "@/components/editor/components/CanvasPreview"
import { defaultTemplates } from "@/store/defaultTemplates"

const page = () => {
    
  return (
    <div className="flex ">
     {defaultTemplates.map((template)=>(
        <div  className="flex " key={template.id}>
        <TemplatePreview currentTemplate={template} />
        </div>

     ))}
    </div>
  )
}
export default page