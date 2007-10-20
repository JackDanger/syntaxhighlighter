ifeq ($(MAKEDEBUG),1)
	JUNK := $(info .   TARGETS_$(d): $(TARGETS_$(d)))
	JUNK := $(info .     CLEAN_$(d): $(CLEAN_$(d)))
endif

###################
### Standard footer
#-include   $(DEPS_$(d))
d       := $(dirstack_$(sp))
sp      := $(basename $(sp))
