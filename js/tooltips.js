
// Smart Tooltip System
// Deliberate interaction: Tooltip appears only after 3 seconds of hover

const tooltipDict = {
    "HARA": `<strong>Hazard Analysis and Risk Assessment</strong><br>
             The foundational step in ISO 26262 functional safety lifecycle.<br>
             It identifies potential hazards based on vehicle functions in specific scenarios,<br>
             assesses Severity (S), Exposure (E), and Controllability (C),<br>
             and determines the Automative Safety Integrity Level (ASIL A-D).`,

    "FMEA": `<strong>Failure Mode and Effects Analysis</strong><br>
             A systematic, bottom-up method for evaluating identifying where and how a process might fail.<br>
             Assess the relative impact of different failures to identify the parts of the process that are most in need of change.<br>
             Used extensively in automotive to validate design robustness.<br>
             Key output: Risk Priority Number (RPN) and recommended actions.`,

    "FMEDA": `<strong>Failure Modes, Effects, and Diagnostic Analysis</strong><br>
              An extension of FMEA that adds quantitative failure rate data.<br>
              Crucial for calculating hardware architectural metrics (SPFM/LFM) in ISO 26262.<br>
              Determines if a hardware design meets the target ASIL metric requirements.<br>
              Evalutes the diagnostic coverage of safety mechanisms.`,

    "FTA": `<strong>Fault Tree Analysis</strong><br>
            A top-down, deductive failure analysis in which an undesired state of a system is analyzed.<br>
            Uses boolean logic to combine a series of lower-level events and basic causes.<br>
            Essential for understanding complex failure chains in ADAS systems.<br>
            Quantifies the probability of a top-level safety goal violation.`,

    "ISO 26262": `<strong>ISO 26262 Functional Safety Standard</strong><br>
                  The international standard for functional safety of electrical and/or electronic systems in production automobiles.<br>
                  It defines a risk-based approach to determine risk classes (ASILs).<br>
                  Provides necessary requirements for the entire safety lifecycle (Management, Development, Production, Operation, Service, Decommissioning).<br>
                  Compliance is mandatory for modern automotive OEMs and Tier 1s.`,

    "ASPICE": `<strong>Automotive SPICE (Software Process Improvement and Capability dEtermination)</strong><br>
               A framework for evaluating software development processes in the automotive industry.<br>
               Ensures quality and traceability across the entire V-Model.<br>
               Levels 0-5 indicate process maturity; Level 2/3 is typically required by OEMs.<br>
               Focuses heavily on bi-directional traceability (Requirements <-> Tests).`,

    "SOTIF": `<strong>Safety Of The Intended Functionality (ISO 21448)</strong><br>
              Addresses hazards caused by functional insufficiencies or performance limitations, not system failures.<br>
              Critical for autonomous systems (L3+) where perception algorithms might fail in edge cases.<br>
              Focuses on minimizing the "Unknown Unsafe" scenario space.<br>
              Requires extensive validation and scenario-based testing.`,

    "EPS": `<strong>Electric Power Steering</strong><br>
            A safety-critical system replacing hydraulic steering with electric motor assistance.<br>
            Requires ASIL D safety goals due to the severity of "Self-Steering" or "Locking" hazards.<br>
            modern EPS features include Lane Keep Assist (LKA) and Park Assist actuation.<br>
            Architecture involves redundant sensors and sometimes redundant ECUs (Fail-Operational).`,

    "ACC": `<strong>Adaptive Cruise Control</strong><br>
            An ADAS system that automatically adjusts vehicle speed to maintain a safe distance.<br>
            Relies on Radar (long-range) and Camera (object classification) fusion.<br>
            Safety Concept involves managing acceleration/deceleration limits to prevent collisions.<br>
            Subject to both Functional Safety (System Faults) and SOTIF (Sensor blindness).`,

    "AEB": `<strong>Autonomous Emergency Braking</strong><br>
            A safety feature that automatically activates the brakes when a collision is imminent.<br>
            Requires extremely high reliability and low false-positive rates to avoid phantom braking.<br>
            Arbitrates between driver intent and system intervention.<br>
            Critical NCAP requirement for modern 5-star safety ratings.`,

    "LKA": `<strong>Lane Keep Assist</strong><br>
            Actively steers the vehicle to keep it within the detected lane markings.<br>
            Requires precise interaction between the Camera module and the EPS ECU.<br>
            Safety goals focus on preventing "unintended steering" that could pull the car into traffic.<br>
            Torque overlay limits are applied to ensure the driver can always override the system.`
};

let tooltipTimer;
const delayTime = 3000; // 3 Seconds

// Create Tooltip Element
const tooltip = document.createElement('div');
tooltip.className = 'tech-tooltip hidden';
document.body.appendChild(tooltip);

document.addEventListener('mouseover', (e) => {
    // Check if target has data-term attribute
    const term = e.target.getAttribute('data-term');

    if (term && tooltipDict[term]) {
        // Clear any existing timer
        clearTimeout(tooltipTimer);

        // Start 3s timer
        tooltipTimer = setTimeout(() => {
            showTooltip(e, tooltipDict[term]);
        }, delayTime);
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.getAttribute('data-term')) {
        clearTimeout(tooltipTimer);
        hideTooltip();
    }
});

function showTooltip(e, content) {
    tooltip.innerHTML = content;
    tooltip.classList.remove('hidden');
    tooltip.classList.add('visible');

    // Position
    const padding = 15;
    let left = e.pageX + padding;
    let top = e.pageY + padding;

    // Boundary check (simple)
    if (left + 400 > window.innerWidth) {
        left = e.pageX - 415;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function hideTooltip() {
    tooltip.classList.remove('visible');
    tooltip.classList.add('hidden');
}
