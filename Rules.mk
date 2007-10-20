include $(MINC)/head.mk
#######################

TARGETS_$(d) := $(BUILD_DIR)/COPYING

########
## Rules

$(TARGETS_$(d)): $(BUILD_DIR)/%: $(d)/%
	$(info Copying $(notdir $<) ...)
	$(Q)cp $< $@

#####################
## Extra Dependancies
$(TARGETS_$(d)): $(d)/Rules.mk $(BD_STAMP)

###############
## Save Changes
TARGETS := $(TARGETS) $(TARGETS_$(d))
CLEAN   := $(CLEAN) $(TARGETS_$(d)) $(LINT_$(d))

#######################
include $(MINC)/foot.mk
