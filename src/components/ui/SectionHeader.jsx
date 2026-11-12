import { Sparkles } from 'lucide-react'
import './SectionHeader.css'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action = null,
  align = 'left',
  titleId,
}) {
  return (
    <div className={`section-header section-header--${align}`}>
      <div className="section-header__copy">
        {eyebrow && (
          <span className="section-header__eyebrow">
            <Sparkles size={13} strokeWidth={2.4} aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="section-heading" id={titleId}>
          {title}
        </h2>
        {subtitle && <p className="section-subtext">{subtitle}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </div>
  )
}
