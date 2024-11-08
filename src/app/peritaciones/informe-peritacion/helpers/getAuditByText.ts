import { auditTypes } from "./auditTypes";

export function getAuditByText(auditType: number) {
    return new Map([
        [auditTypes.NO_AUDITA, 'No auditada'],
        [auditTypes.AUDITA_TRD, 'Auditó TRD'],
        [auditTypes.AUDITA_CIA, 'Auditó CIA'],
        [auditTypes.AUDITA_IA_IDENTIFICACION_NAU, 'Identificación IA'],
        [auditTypes.AUDITA_IA_IDENTIFICACION_TRD, 'Identificación IA + TRD'],
        [auditTypes.AUDITA_IA_IDENTIFICACION_CIA, 'Identificación + CIA'],
        [auditTypes.AUDITA_IA_DANIOS_IDE_NAU, 'Daños IA'],
        [auditTypes.AUDITA_IA_DANIOS_IDE_TRD, 'Daños IA + TRD'],
        [auditTypes.AUDITA_IA_DANIOS_IDE_CIA, 'Daños IA + CIA'],
    ]).get(auditType) || 'No auditada'
}
