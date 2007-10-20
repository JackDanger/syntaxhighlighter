include $(MINC)/head.mk
#######################

SOURCE_$(d) := $(d)/SyntaxHighlighter.css
TARGETS_$(d) := \
	$(patsubst $(d)/%.css, $(BUILD_MAX_DIR)/%.css, $(SOURCE_$(d))) \
	$(patsubst $(d)/%.css, $(BUILD_MIN_DIR)/%.css, $(SOURCE_$(d)))

############
## Rules
$(filter $(BUILD_MAX_DIR)/%.css, $(TARGETS_$(d))): $(BUILD_MAX_DIR)/%.css: $(d)/%.css
	$(info Copying $(notdir $(filter %.css,$^)) ...)
	$(Q)cp $(filter %.css,$^) $@

$(filter $(BUILD_MIN_DIR)/%.css, $(TARGETS_$(d))): $(BUILD_MIN_DIR)/%.css: $(d)/%.css
	$(info Minimizing $(notdir $(filter %.css,$^)) ...)
	$(Q)$(YC) $(YC_CSS_FLAGS) -o $@ $(filter %.css,$^)

#####################
## Extra Dependancies
$(TARGETS_$(d)): $(d)/Rules.mk $(BD_STAMP)

###############
## Save Changes
TARGETS := $(TARGETS) $(TARGETS_$(d))
CLEAN   := $(CLEAN) $(TARGETS_$(d)) $(LINT_$(d))

#######################
include $(MINC)/foot.mk
